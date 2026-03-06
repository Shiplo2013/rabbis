const fetchTestData = async () => {
  //* Use the Query we generated in the IDE
    const query = `
      query TestQuery {
        posts {
          edges {
            node {
              id
              uri
              title
              excerpt
            }
          }
        }
      }
    `;

    const res = await fetch("https://dovp7.sg-host.com/graphql", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
    });


    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const { data } = await res.json();
    return data;
}

export default fetchTestData;