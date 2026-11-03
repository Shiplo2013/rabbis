<?php
/**
 * Plugin Name: Next.js Cache Revalidation
 * Description: Automatically revalidates Next.js cache when WordPress content is updated
 * Version: 1.0.0
 * Author: Chevronyeshiva Development Team
 */

if (!defined('ABSPATH')) {
    exit;
}

class NextJSRevalidation {
    private $revalidation_secret = 'st8SH9DAyYG3oJDjPoLfOzOe5tA0seBJ';
    private $site_url = 'https://www.chevronyeshiva.org';
    private $api_endpoint = '/api/revalidate';

    public function __construct() {
        $this->init_hooks();
    }

    private function init_hooks() {
        // Register revalidation for all post types
        $post_types = array(
            'page',
            'post',
            'news',
            'communities',
            'magazines',
            'past-rabbis',
            'knesset-of-customs',
            'yeshiva-rabbis',
            'zatzel-graduates',
            'holidays',
            'committee-posts',
        );

        foreach ($post_types as $post_type) {
            add_action("save_post_{$post_type}", array($this, 'revalidate_on_save'), 10, 3);
        }
    }

    public function revalidate_on_save($post_id, $post, $update) {
        // Skip autosaves and revisions
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        // Only process published posts
        if ($post->post_status !== 'publish') {
            return;
        }

        // Skip if no slug
        if (empty($post->post_name)) {
            return;
        }

        $this->trigger_revalidation($post);
    }

    private function trigger_revalidation($post) {
        // Build the revalidation URL with secret as query parameter
        $revalidation_url = add_query_arg(
            'secret',
            urlencode($this->revalidation_secret),
            $this->site_url . $this->api_endpoint
        );

        // Prepare request body
        $request_body = array(
            'slug'      => $post->post_name,
            'post_type' => $post->post_type,
        );

        // Configure HTTP request
        $args = array(
            'method'      => 'POST',
            'headers'     => array(
                'Content-Type' => 'application/json',
                'User-Agent'   => 'WordPress/' . get_bloginfo('version'),
            ),
            'body'        => wp_json_encode($request_body),
            'timeout'     => 30,
            'sslverify'   => true,
            'blocking'    => true,
        );

        // Send revalidation request
        $response = wp_remote_post($revalidation_url, $args);

        // Log results
        $this->log_revalidation($post->ID, $post->post_name, $post->post_type, $response);
    }

    private function log_revalidation($post_id, $slug, $post_type, $response) {
        $log_file = WP_CONTENT_DIR . '/uploads/nextjs-revalidation.log';

        $log_entry = sprintf(
            "[%s] POST ID: %d | Slug: %s | Type: %s",
            date('Y-m-d H:i:s'),
            $post_id,
            $slug,
            $post_type
        );

        if (is_wp_error($response)) {
            $log_entry .= ' | ERROR: ' . $response->get_error_message();
            file_put_contents($log_file, $log_entry . "\n", FILE_APPEND);
            return;
        }

        $status_code = wp_remote_retrieve_response_code($response);
        $response_body = wp_remote_retrieve_body($response);

        if (empty($status_code)) {
            $log_entry .= ' | ERROR: No response status code (connection failed)';
            $headers = wp_remote_retrieve_headers($response);
            if (is_array($headers)) {
                $log_entry .= ' | Headers: ' . json_encode($headers);
            }
            file_put_contents($log_file, $log_entry . "\n", FILE_APPEND);
            return;
        }

        if ($status_code >= 200 && $status_code < 300) {
            $log_entry .= ' | SUCCESS (Status: ' . $status_code . ')';
        } else {
            $log_entry .= ' | FAILED - Status: ' . $status_code . ' | Response: ' . substr($response_body, 0, 300);
        }

        file_put_contents($log_file, $log_entry . "\n", FILE_APPEND);
    }
}

// Initialize the revalidation handler
new NextJSRevalidation();
