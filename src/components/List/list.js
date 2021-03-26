import {AiOutlineSearch} from 'react-icons/all'
import './list.css'
const data =  [
    {
        listName: 'fruit and vegetables',
        listItems: [
            {listName: 'fruit and vegetables',
                id: 'nemqeqweqwkeiejf2334234',
                title: 'watermelon',
                note: 'olestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio,eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos  sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam',
                calories: '234',
                pics: 1,
                image:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            {listName: 'fruit and vegetables',
                id:'jasnsdjn123n12j3n',
                title: 'apple',
                note: 'this is just a apple',
                calories: '120',
                pics: 1,
                image:'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'
            },
            {listName: 'fruit and vegetables',
                id:'ajsndajsna313123123',
                title: 'banana',
                note: 'this is just a banana',
                calories: '100',
                pics: 1,
                image:'https://images.unsplash.com/photo-1589217157315-046ac1a3fca6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
            },
            {listName: 'fruit and vegetables',
                id: 'isndnj12j3n12j3n213n45n46j7n345',
                title: 'grapes',
                note: 'this is just a grapes',
                calories: '121',
                pics: 1,
                image: 'https://images.unsplash.com/photo-1610725856595-33a4cadd2061?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80'
            },
            {listName: 'fruit and vegetables',
                id: '1j3n1j2n3j4n3j4132321',
                title: 'cheese',
                note: 'this is just a cheese',
                calories: '1000',
                pics: 1,
                image:'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1053&q=80'
            }
        ]
    },
    {
        listName: 'meat and fish',
        listItems: [
             {listName: 'meat and fish',
                id: '1j3n1j2n3j4n3j413232hab1',
                title: 'chicken',
                note: 'this is just a chicken',
                calories: '5000',
                pics: 1,
                image:'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80'
            },
            {listName: 'meat and fish',
                id: 'hjhfsdfsfdfjnskj342343',
                title: 'meat',
                note: 'this is just a meat',
                calories: '9000',
                pics: 1,
                image:'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
            },
            {listName: 'meat and fish',
                id: 'jnsdfjnje234234j3knsdf',
                title: 'crabs',
                note: 'this is just a crabs',
                calories: '500',
                pics: 1,
                image:'https://images.unsplash.com/photo-1550586554-a5a846e56593?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80'
            },
            {listName: 'meat and fish',
                id: 'indfnjenff4n6n645',
                title: 'fish',
                note: 'this is just a fish',
                calories: '470',
                pics: 1,
                image:'https://images.unsplash.com/photo-1534948216015-843149f72be3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
            }
        ]
    }
]
const List = ({setmoreInfo}) => {
    return (
        <div className='list-box'>
            <div className='list_navbar'>
                <div className='title'>
                    <span style={{ color: '#F9A109' }}>Shoppingify</span> allows you take your shopping list wherever you go
                </div>
            </div>
            <div className='list_contents'>
                {
                    data.map((item, index) => {
                        return (
                            <>
                                <div key={index} className='main-title'>{item.listName}</div>
                                <div className='list-items'>
                                    {
                                        item.listItems.map((items) => {
                                            return (
                                                <div key={items.id} className='list-item' onClick={() => { setmoreInfo(items) }} >
                                                    <div>{items.title}</div>
                                                    <div className='plus'>+</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default List