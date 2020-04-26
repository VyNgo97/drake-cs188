import Layout from '../../components/MyLayout';
import fetch from 'isomorphic-unfetch';
import uuid from 'uuid';

const addItemToCart = async (itemId) => {
    const customerResponse = await fetch(`http://localhost:8000/customers`);
    const [customer] = await customerResponse.json();
    const cartResponse = await fetch(`http://localhost:8000/customers/${customer.customerId}/carts`);
    const [cart] = await cartResponse.json();
    await fetch(`http://localhost:8000/cart-items`, {
        method: 'POST',
        body: JSON.stringify({
            cartItemId: uuid.v4(),
            cartId: cart.cartId,
            itemId,
            quantity: 1
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
};


const Index = props => (
  <Layout>
    <h1>Item Info</h1>
    <img src={props.item.image}/>
    <p>Description: {props.item.description}</p>
    <p>Price: {props.item.price}</p>
    <button type="button" onClick={() => addItemToCart(props.item.itemId)}>
      Add to Cart
    </button>
  </Layout>
);

Index.getInitialProps = async function(context) {
  const { itemId } = context.query;
  const res = await fetch(`https://localhost:8000/items/${itemId}`);
  // const show = await res.json();
  return { item };
};

export default Index;