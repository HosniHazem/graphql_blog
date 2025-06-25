import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $postSlug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, postSlug: $postSlug}) { id }
    }
  `;
  // 2. Publish the comment
  const publishQuery = gql`
  mutation PublishComment($id: ID!) {
    publishComment(where: {id: $id}) { id }
  }
  `;
  try {
    const result = await graphQLClient.request(query, {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      postSlug: req.body.slug,
    });
    // Publish the comment
    const publishResult = await graphQLClient.request(publishQuery, {
      id: result.createComment.id,
    });
    return res.status(200).send({ ...result, ...publishResult });
  } catch (error) {
    console.error(error); // <--- Add this line
    return res.status(500).json({ error: error.message });
  }
}
