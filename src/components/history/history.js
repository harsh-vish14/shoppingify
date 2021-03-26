import { useEffect, useState } from 'react'
import { MdDateRange,BiChevronRight } from 'react-icons/all'
import { auth, db } from '../../firebase'
import './history.css'
const History = () => {
    const [dataCame, setDataCame] = useState([]);
    useEffect( async () => {
        await auth.onAuthStateChanged((userinfo) => {
            if (userinfo) {
                db.collection('users').doc(userinfo.uid).get()
                    .then((snapshot) => {
                        var data = snapshot.data()
                        setDataCame([...data.Items]);
                    })
            }
        });
    },[])
    return (
        <div className='history-box'>
            <div className='history-title'>Shopping history</div>
            <div className='history-bars'>
                {
                    dataCame.length != 0 ? (
                        <>
                            {
                                dataCame.map((items) => {
                                    return (
                                        <>
                                            <div className='history-bars-title'>
                                                {items.listName}
                                            </div>
                                            {
                                                items.items.map((item) => {
                                                    return (
                                                        <div className='history-bars-content'>
                                                            <div className='title'>
                                                                {item.title}
                                                            </div>
                                                            {
                                                                item.delete ? (
                                                                    
                                                                    <div className='not-in list'>
                                                                        Deleted
                                                                    </div>
                                                                ) : (
                                                                    <div className='in list'>
                                                                        In List
                                                                    </div>
                                                                )
                                                            }
                                                            <div className='date'>
                                                                <div style={{ opacity: '0.5', fontSize: '13px' }}><MdDateRange /> {' ' + item.time + ' ' + item.data}</div>
                                                                <div><BiChevronRight /></div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                    );
                                })
                            }
                        </>
                    ) : (
                        <div>
                            loading....
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default History;