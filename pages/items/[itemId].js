import Layout from '../../components/MyLayout';
import fetch from 'isomorphic-unfetch';


const Post = props => (
  <Layout>
    <h1>Item Info</h1>
    <img src={props.item.image}/>
    <p>Description: {props.item.description}</p>
    <p>Price: {props.item.price}</p>
  </Layout>
);

Post.getInitialProps = async function(context) {
  const { itemId } = context.query;
  const res = await fetch(`https://localhost:8000/items/${itemId}`);
  const show = await res.json();
  return { item };
};

export default Post;