import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip,ResponsiveContainer } from 'recharts';
import { auth, db } from '../../firebase';
import { useEffect, useState } from 'react'
import { Modal, show, Button } from 'react-bootstrap'
import './stats.css'
import { Redirect } from 'react-router';

const Stats = ({setmoreInfo,setWantToInput}) => {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const [stats,setStats] =useState([])
    useEffect(() => {
        var statsData = [];
        auth.onAuthStateChanged((userinfo) => {
            if (userinfo) {
                db.collection('users').doc(userinfo.uid).get()
                    .then((snapshot) => {
                        var data = [...snapshot.data().Items];
                        for (var i = 0; i < data.length; i++) {
                            var count = 0
                            for (let j = 0; j < data[i].items.length; j++) {
                                if (data[i].items[j].delete === true) {
                                    count++;
                                }
                            }
                            statsData.push({
                                name: data[i].listName,
                                percent: Math.floor((count * 100) / data[i].items.length),
                                amt: 100
                            });
                        }
                    })
                    .then(() => {
                        setStats([...statsData]);
                    })
            }
        });
    }, [])
    const deleteList = () => {
        auth.onAuthStateChanged((userinfo) => {
            if (userinfo) {
                db.collection('users').doc(userinfo.uid).set({
                    Items: []
                })
                    .then(() => {
                    setStats([])
                })

            }
        })
    }
    return (
        <div className="stats-box">
            <div className="stats-bars">
                <div className="title">
                    <div>Category</div>
                    <div className="delete" onClick={() =>{handleShow()}}>Delete List</div>
                </div>
                {
                    stats.length != 0 ? (
                        stats.map((item,i) => {
                            return (
                                <div className="bars" key={i}>
                                    <div className="bar-content">
                                        <div>{item.name}</div>
                                        <div>{item.percent}%</div>
                                    </div>
                                    <div className="stats-progress-bar" >
                                        <div className="indicator" style={{ width: `${item.percent}%`, background: `rgb(${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)})` }}></div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div>Loading</div>
                    )
                }
                <ResponsiveContainer width={500} height={300}>
                <LineChart data={stats} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                    <Line type="monotone" dataKey="percent" stroke="#F9A109" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                        <Tooltip />
                </LineChart>
                </ResponsiveContainer>
            </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
                keyboard={false}
                style={{fontWeight: 'bold'}}
      >
        <Modal.Header>
          <Modal.Title>Delete List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          After deleting the list Data can't be retrieved
        </Modal.Body>
        <Modal.Footer>
        <div  onClick={handleClose} style={{marginRight:'10px',cursor:'pointer'}}>
            cancel
        </div>
                    <Button variant="danger" onClick={() => { deleteList() ;handleClose();setWantToInput(true) }}>Delete</Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
}

export default Stats;