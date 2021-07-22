import { useEffect, useState } from "react";

function AssignStudent() {
  const [mlist, setMlist] = useState([]);
  const [slist, setSlist] = useState([]);

  const [mentor, setMentor] = useState();
  const [student, setStudent] = useState([]);

  const StudentList = async () => {
    try {
      const obj = await fetch("http://localhost:5002/getStudent", {
        method: "GET",
        headers: {
          "Content-Type": "application/JSON",
        },
      });
      const sdata = await obj.json();

      setSlist(sdata);

      if (obj.status !== 200) {
        const error = new Error(obj.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const MentorList = async () => {
    try {
      const obj = await fetch("http://localhost:5002/getMentor", {
        method: "GET",
        headers: {
          "Content-Type": "application/JSON",
        },
      });

      const mdata = await obj.json();

      setMlist(mdata);

      if (obj.status !== 200) {
        const error = new Error(obj.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AddStudents = (stud) => {
    const temp = [...student];
    temp.push(stud);
    setStudent(temp);
  };

  const Assign = async () => {
    const obj = await fetch("http://localhost:5002/updateMentor", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        mentorId: mentor,
        studentId: student,
      }),
    });
    const data = await obj.json();
    console.log(data);
  };

  useEffect(() => {
    StudentList();
    MentorList();
  });
  return (
    <div className="panel">
      <h1 className="title">Assign Student</h1>
      <div className="imgDiv">
        {/* <img className="imgBG" src="/images/codes.jpg" alt="bg" /> */}
      </div>
      <p className="p-align">
        Click <strong>Assign</strong> after selecting any one mentor and the
        required students under them.
      </p>

      <section className="f-screen dualScreen">
        <ul className="mentorSide">
          {mlist.map((mEle) => {
            return (
              <li className="chkBox" key={mEle._id}>
                <span>{mEle.name}</span>

                <input
                  type="radio"
                  name="ment"
                  onClick={() => setMentor(mEle._id)}
                />
              </li>
            );
          })}
        </ul>

        <ul className="studentSide">
          {slist.map((sEle) => {
            if (!sEle.status) {
              return (
                <li className="chkBox" key={sEle._id}>
                  <span>{sEle.name}</span>
                  <input
                    type="checkbox"
                    id={sEle._id}
                    onClick={() => AddStudents(sEle._id)}
                  />
                </li>
              );
            }
          })}
        </ul>
      </section>
      <button className="assign-btn" onClick={() => Assign()}>
        Assign
      </button>
    </div>
  );
}

export default AssignStudent;
