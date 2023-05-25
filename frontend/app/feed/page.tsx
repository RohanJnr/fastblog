async function getData() {
    const res = await fetch('http://localhost:8000/api/posts');
   
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
   
    return res.json();
  }
  

const FeedPage = async () => {

    const data = await getData()

    return (
        <div>
            <h1>Feed Page</h1>
            {data.map(item => {
                <p>{item.title}</p>
            })}
        </div>
    )
}

export default FeedPage