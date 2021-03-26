import { useContext } from 'react'
import {IoIosArrowRoundBack} from 'react-icons/all'
import { UserContext } from '../../../costext/context'
import { auth, db } from '../../../firebase'
import firebase from 'firebase'
const SideBarDisplay = ({ displayIndex, setmoreInfo,listitems }) => {
    const AddIt = async () => {
        var time = new Date();
        const requireTime = time.toDateString().split(' ')
        requireTime.shift()
        // var output = `${time.toLocaleTimeString()} ${requireTime.join(' ')}`
        const output = {
            time: time.toLocaleTimeString(),
            data: requireTime.join(' ')
        }
        await auth.onAuthStateChanged((userInfo) => {
            var updatedData
            if (userInfo) {
                db.collection('users').doc(userInfo.uid).get()
                    .then((snapshot) => {
                        const data = snapshot.data();
                        updatedData = data.Items
                        if (updatedData) {
                            var entered = false;
                            for (let i = 0; i < updatedData.length; i++) {
                                if (updatedData[i].listName === displayIndex.listName) {
                                    entered = true;
                                    updatedData[i].items.push({
                                        ...displayIndex,
                                        ...output,
                                        delete: false,
                                    });
                                    break;
                                }
                            }
                            if (entered === false) {
                                updatedData.push({
                                    listName: displayIndex.listName,
                                    items: [
                                        {
                                            ...displayIndex,
                                            ...output,
                                            delete: false,
                                        }
                                    ]
                                });
                            }
                            db.collection('users').doc(userInfo.uid).set({
                                Items: updatedData
                            }).then(() => {
                                
                                    setmoreInfo(null)
                            })
                        } else {
                            db.collection('users').doc(userInfo.uid).set({
                                Items: [
                                    {
                                        listName: displayIndex.listName,
                                        items: [
                                            {
                                                ...displayIndex,
                                                ...output,
                                                delete: false,
                                            }
                                        ],
                                        
                                    }
                                ]
                            }, { merge: true })
                                .then(() => {
                                
                                    setmoreInfo(null)
                            })
                        }
                    });
            }
        })
        
    }
    return (
        <div className='sidebar-display'>
            <div className='back' style={{marginLeft:'0px'}} onClick={() => { setmoreInfo(null) }}>
                <IoIosArrowRoundBack /> Back
                        </div>
            <div className='image'>
                <img src={displayIndex.image} height='100%' />
            </div>
            <div className='title details'>
                <div className='label'>Name</div>
                {displayIndex.title}
            </div>
            <div className='note details'>
                <div className='label'>Notes</div>
                {displayIndex.note}
            </div>
            <div className='cals details'>
                <div className='label'>Calories</div>
                {displayIndex.calories}
            </div>
            <div className='buts'>
                <div className='cancel' onClick={() => { setmoreInfo(null) }}>cancel</div>
                <div className='save' onClick={() => { AddIt() }}>Add to list</div>
            </div>
        </div>
    );
}
export default SideBarDisplay;