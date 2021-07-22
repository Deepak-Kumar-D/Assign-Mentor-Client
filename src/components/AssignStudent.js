import { useContext, useEffect, useState } from "react";
import { showLoad } from "../App";
import { HashLoader } from "react-spinners";

function AssignStudent() {
  const { loading, setLoading } = useContext(showLoad);

  const [mlist, setMlist] = useState([]);
  const [slist, setSlist] = useState([]);

  const [mentor, setMentor] = useState();
  const [student, setStudent] = useState([]);

  const AddStudents = (stud) => {
    const temp = [...student];
    temp.push(stud);
    setStudent(temp);
  };

  const StudentList = async () => {
    setLoading(true);

    const obj = await fetch("http://localhost:5002/getStudent", {
      method: "GET",
    });

    const sdata = await obj.json();
    setSlist(sdata);

    setLoading(false);
  };

  const Assign = async () => {
    setLoading(true);
    await fetch("http://localhost:5002/updateMentor", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        mentorId: mentor,
        studentId: student,
      }),
    });

    setLoading(false);
    StudentList();
  };

  useEffect(() => {
    const MentorList = async () => {
      setLoading(true);

      const obj = await fetch("http://localhost:5002/getMentor", {
        method: "GET",
      });

      const mdata = await obj.json();
      setMlist(mdata);

      setLoading(false);
    };

    MentorList();
    StudentList();
  }, [setLoading, setStudent]);
  return (
    <div className="panel">
      <h1 className="title">Assign Student</h1>
      <div className="imgDiv">
        <img className="imgBG" src="/images/codes.jpg" alt="bg" />
      </div>
      <p className="p-align">
        Click <strong>Assign</strong> after selecting any one mentor and the
        required students under them.
      </p>

      {loading ? (
        <HashLoader />
      ) : (
        <section className="f-screen dualScreen">
          <ul className="mentorSide">
            {!mlist.length
              ? "loading"
              : mlist.map((mEle) => {
                  return (
                    <li className="chkBox" key={mEle._id}>
                      <label htmlFor={mEle._id}>{mEle.name}</label>

                      <input
                        type="radio"
                        id={mEle._id}
                        name="ment"
                        onClick={() => setMentor(mEle._id)}
                      />
                    </li>
                  );
                })}
          </ul>

          <ul className="studentSide">
            {!slist.length
              ? "loading"
              : slist.map((sEle) => {
                  return (
                    <div key={sEle._id}>
                      {!sEle.status ? (
                        <li className="chkBox">
                          <label htmlFor={sEle._id}>{sEle.name}</label>
                          <input
                            type="checkbox"
                            id={sEle._id}
                            onClick={() => AddStudents(sEle._id)}
                          />
                        </li>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
          </ul>
        </section>
      )}
      <button className="btn assign-btn" onClick={() => Assign()}>
        Assign
      </button>
    </div>
  );
}

export default AssignStudent;
