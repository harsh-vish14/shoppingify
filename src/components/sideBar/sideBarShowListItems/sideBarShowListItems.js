import { AiFillDelete,AiOutlineMinus,AiOutlinePlus, VscNewFile } from 'react-icons/all'
import { auth, db } from "../../../firebase";
import {useEffect,useState} from 'react'

const SideBarShowListItems = ({ setWantToInput,setCartCount }) => {
    const [render, setRender] = useState()
    var dataCame
    useEffect(async () => {
        await auth.onAuthStateChanged((userinfo) => {
            if (userinfo) {
                db.collection('users').doc(userinfo.uid).get()
                    .then((snapshot) => {
                        const data = snapshot.data()
                        if (data.Items) {
                            dataCame = data.Items
                            elementsRender(dataCame)
                        }
                    })
            }
        })
    }, []);

    const DeleteMe = async (id) => {
        var time = new Date();
        const requireTime = time.toDateString().split(' ')
        requireTime.shift()
        // var output = `${time.toLocaleTimeString()} ${requireTime.join(' ')}`
        const output = {
            time: time.toLocaleTimeString(),
            data: requireTime.join(' ')
        }
        if (dataCame.length != 0) {
            var newData = dataCame;
            var updated = false;
            for (let i = 0; i < newData.length; i++) {
                for (let j = 0; j < newData[i].items.length; j++) {
                    if (newData[i].items[j].id === id && newData[i].items[j].delete === false) {
                        newData[i].items[j].delete = true;
                        newData[i].items[j].time = output.time;
                        newData[i].items[j].data = output.data;
                        updated = true;
                        break;
                    }
                }
                if (updated) {
                    break;
                }
            }
            if (newData.length === 0) {
                elementsRender()
            } else {
                elementsRender(newData);
            }
            auth.onAuthStateChanged((userinfo) => {
                if (userinfo) {
                    db.collection('users').doc(userinfo.uid).set({
                        Items: newData
                    });
                }
            })
        }
    };
    const addOne = (id) => {
        var newData = dataCame;
            var updated = false;
            for (let i = 0; i < newData.length; i++) {
                for (let j = 0; j < newData[i].items.length; j++) {
                    if (newData[i].items[j].id === id) {
                        newData[i].items[j].pics++;
                    }
                }
                if (updated) {
                    break;
                }
            }
            if (newData.length === 0) {
                elementsRender()
            } else {
                elementsRender(newData);
            }
            auth.onAuthStateChanged((userinfo) => {
                if (userinfo) {
                    db.collection('users').doc(userinfo.uid).set({
                        Items: newData
                    });
                }
            })
    }
    const removeOne = (id) => {
        var newData = dataCame;
            var updated = false;
            for (let i = 0; i < newData.length; i++) {
                for (let j = 0; j < newData[i].items.length; j++) {
                    if (newData[i].items[j].id === id && newData[i].items[j].pics > 1) {
                        newData[i].items[j].pics--;
                    }
                }
                if (updated) {
                    break;
                }
            }
            if (newData.length === 0) {
                elementsRender()
            } else {
                elementsRender(newData);
            }
            auth.onAuthStateChanged((userinfo) => {
                if (userinfo) {
                    db.collection('users').doc(userinfo.uid).set({
                        Items: newData
                    });
                }
            })
    }
    
    const elementsRender = (displayList) => {
        var count = 0
        setRender (
            displayList? (
                    displayList.map((item) => {
                        return (
                            <>
                                <div className="sideBar_display_title">{item.listName}</div>
                                {
                                    item.items.map((list) => {
                                        return (
                                            
                                            list.delete ? (
                                                <>
                                                    {null}
                                                </>
                                            ) : (
                                                <div className="display_list_item" >
                                                    {
                                                        <>
                                                            <div style={{display: 'none'}}>{count ++}</div>
                                                            <div className="display_list_title">{list.title}</div>
                                                            <div className='edit'>
                                                                <div className='delete' onClick={() => { DeleteMe(list.id) }}><AiFillDelete /></div>
                                                                <div className='minus' onClick={() => { removeOne(list.id) }}><AiOutlineMinus /></div>
                                                                <div className="display_list_pics">{list.pics} pcs</div>
                                                                <div className='plus' onClick={() => { addOne(list.id) }}><AiOutlinePlus /></div>
                                                            </div>
                                                        </>
                                                    
                                                    }
                                                </div>
                                            )
                                            
                                        )
                                    })
                                }
                            </>
                        )
                    })
                ) : (
                    <div>
                        It is empty list
                    </div>
                )
        )
        setCartCount(count);
    }
    return (
        <div className='sidebar_show_list_item'>
            <div className='sidebar_show_list_item_header'>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/images/source.svg`} height="100px" />
                </div>
                <div className="content">
                    <div className='title'>Didn’t find what you need?</div>
                    <div className='add-btn' onClick={()=>{setWantToInput(true)}}>Add item</div>
                </div>
            </div>
            {
                render
            }
        </div>
    );
}
export default SideBarShowListItems;