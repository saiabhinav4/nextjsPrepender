import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

function HomePage(props){
  const { products }= props;
  return <ul>
      { products.map(product=>(<li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link> </li>)) }
  </ul>
}

  export async function getStaticProps(){
    console.log("re-Generated")
    const filePath= path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonData= await fs.readFile(filePath);
    const data= JSON.parse(jsonData);

    if(!data){
      return {redirect:{
        destination:"/no-data"
      }}
    }

    if(data.products.length==0){
      return {notFound:true};
    }
    return {
      props: {
        products: data.products
      },
      // revalidate: 10, //every 10 sec re-created atmost once.
      // notFound: true   // true means return 404 error and render 404 error page instead of normal page
    };
  }


export default HomePage;