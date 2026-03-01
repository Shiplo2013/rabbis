import { gql } from "@apollo/client";
import MenuGragment from "./fragments/menuItem";

const GET_MENU = gql`
  aluminiMenu: menuItems(where: {location: ALUMINI_MENU}) {
    edges {
      node {
        ...MenuItemFragment
        childItems {
          edges {
            node {
                ...MenuItemFragment
            }
          }
        }
      }
    }
  }
  aluminiMenuBottom: menuItems(where: {location: ALUMINI_MENU_BOTTOM}) {
    edges {
      node {
        ...MenuItemFragment
      }
    }
  }
  knessetMenu: menuItems(where: {location: KNESSET_MENU}) {
    edges {
      node {
        ...MenuItemFragment
        childItems {
          edges {
            node {
              ...MenuItemFragment
            }
          }
        }
      }
    }
  }
  knessetMenuBottom: menuItems(where: {location: KNESSET_MENU_BOTTOM}) {
    edges {
      node {
        id
        label
        path
        title
        url
        childItems {
          edges {
            node {
              ...MenuItemFragment
            }
          }
        }
      }
    }
  }
${MenuGragment}
`;

export default GET_MENU;