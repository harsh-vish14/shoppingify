import { IoIosArrowRoundBack } from 'react-icons/all'
import { useEffect, useState } from 'react';
import { auth, db } from "../../../firebase";
const SideBarInputItem = ({ setWantToInput }) => {
    const [dataCame, setDataSet] = useState([])
    const [showOption, setShowOption] = useState(false);
    const [userInput, setUserInput] = useState({
        title: '',
        note: '',
        pics: 1,
        image: '',
        category: '',
        calories:''
    });
    useEffect(async () => {
        await auth.onAuthStateChanged((userinfo) => {
            if (userinfo) {
                db.collection('users').doc(userinfo.uid).get()
                    .then((snapshot) => {
                        const optionData = [...snapshot.data().Items];
                        // optionData = [...optionData.Items]
                        var optionsValue = []
                        optionData.map((option) => {
                            optionsValue.push(option.listName);
                        })
                        setDataSet(optionsValue)
                    });
            };
        })
    }, []);
    const save = async () => {
        var updatedData = []
        var time = new Date();
        const requireTime = time.toDateString().split(' ')
        requireTime.shift()
        // var output = `${time.toLocaleTimeString()} ${requireTime.join(' ')}`
        const output = {
            time: time.toLocaleTimeString(),
            data: requireTime.join(' ')
        }
        await auth.onAuthStateChanged((userinfo) => {
            if (userinfo) {
                db.collection('users').doc(userinfo.uid).get()
                    .then((snapshot) => {
                        var data = snapshot.data();
                        if (data) {
                            var entered = false;
                            updatedData = [...data.Items]
                            for (let i = 0; i < updatedData.length; i++) {
                                if (updatedData[i].listName === userInput.category) {
                                    entered = true;
                                    updatedData[i].items.push({
                                        ...userInput,
                                        ...output,
                                        delete: false,
                                    });
                                }
                            }
                            if (entered === false) {
                                updatedData.push({
                                    listName: userInput.category,
                                    items: [
                                        {
                                            ...userInput,
                                            ...output,
                                            delete: false,
                                        }
                                    ]
                                });
                            }
                            db.collection('users').doc(userinfo.uid).set({
                                Items: updatedData
                            })
                                .then(() => {
                                    setUserInput({
                                        title: '',
                                        note: '',
                                        pics: 1,
                                        image: '',
                                        category: '',
                                        calories: ''
                                    });
                                    setWantToInput(null);
                                })
                        }
                    })
            }
        })
    };
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserInput((preve) => {
            return (
                {
                    ...preve,
                    [name]: value
                }
            );
        })
    };
    return (
        <div className='sidebar-input'>
            <div className='back' onClick={() => { setWantToInput(null) }}>
                <IoIosArrowRoundBack /> Back
            </div>
            <div className='sidebar-input-title'>
                Add a new item
            </div>
            <div className='sidebar-inputs'>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="name" name="title" onChange={handleChange} value={userInput.title} />
                    <label for="floatingInput">Name</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }} name='note' onChange={handleChange} value={userInput.note}></textarea>
                    <label for="floatingTextarea2">Note (Optional)</label>
                </div>
                <div class="select-option">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="cat" autocomplete="off" onFocus={() => { setShowOption(true) }} name="category" onChange={handleChange} value={userInput.category}  />
                        <label for="floatingInput">Category</label>
                    </div>
                    <div className="options" style={{ display: showOption ? ('') : ('none') }} onMouseLeave={()=>{setShowOption(false)}} >
                        {
                            dataCame ? (
                                <>
                                    {
                                        dataCame.map((option) => {
                                            return (
                                                <div className='option-item' onClick={() => {
                                                    setUserInput((preve) => {
                                                        return (
                                                            {
                                                                ...preve,
                                                                category: option
                                                            }
                                                        )
                                                    })
                                                }}>
                                                    {option}
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            ) : (
                                <div>Loading...</div>
                            )
                        }
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="name" name="calories" onChange={handleChange} value={userInput.calories}  />
                    <label for="floatingInput">Calories</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="image" name="image" onChange={handleChange} value={userInput.image}  />
                    <label for="floatingInput">Image URL</label>
                </div>
                
            </div>
            <div className='buts'>
                <div className='cancel' onClick={() => { setWantToInput(null) }}>cancel</div>
                <div className='save' onClick={()=>{save()}}>Save</div>
            </div>
        </div>
    );
}

export default SideBarInputItem;