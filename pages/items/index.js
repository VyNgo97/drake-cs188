import Layout from '../../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
  <Layout>
    <h1>Shop Items</h1>
    <ul>
      {props.items.map(item => (
					<li key={item.itemId}>
						<Link href="/items/[itemId]" as={`/items/${item.itemId}`}>
							<a>{item.description}</a>
						</Link>
					</li>
				))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('https://localhost:8000/items');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    items
  };
};

export default Index;
