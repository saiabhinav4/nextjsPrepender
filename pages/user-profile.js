function UserProfilePage(props){
    return <h1>{props.username}</h1>
}

export default UserProfilePage;

export async function getServerSideProps(context){
    console.log("server-side code executed");
    return {
        props:{
            username: "Nature4"
        }
    }
}