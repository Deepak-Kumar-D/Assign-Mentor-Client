import { useContext, useEffect, useState } from "react";
import { showLoad } from "../App";
import { BeatLoader } from "react-spinners";

function AssignStudent() {
  const { loading, setLoading } = useContext(showLoad);
  const [mlist, setMlist] = useState([]);
  const [slist, setSlist] = useState([]);
  const [mentor, setMentor] = useState();
  const [student, setStudent] = useState([]);

  // Assigning multiple students to a variable as an array
  const AddStudents = (stud) => {
    const temp = [...student];
    temp.push(stud);
    setStudent(temp);
  };

  // Fetching the student data on router page load
  const StudentList = async () => {
    setLoading(true);
    const obj = await fetch("http://localhost:5002/getStudent", {
      method: "GET",
    });

    const sdata = await obj.json();
    setSlist(sdata);
    setLoading(false);
  };

  // Assigning the array of students to the selected mentor
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

    setMentor();
    setStudent([]);
    setLoading(false);
    StudentList();
  };

  useEffect(() => {
    // Fetching the mentor data on router page load
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
  }, [setStudent]);
  return (
    <>
      {loading ? (
        <div className="load">
          <BeatLoader />
        </div>
      ) : (
        <div className="panel">
          <h1 className="title">Assign Student</h1>
          <div className="imgDiv">
            <img className="imgBG" src="/images/codes.jpg" alt="bg" />
          </div>
          <p className="p-align">
            Click <strong>Assign</strong> after selecting any one mentor and the
            required students under them.
          </p>

          <section className="f-screen dualScreen">
            {/* Listing the list of mentors on one panel and adding the selection function to it */}
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

            {/* List of available students who do not have mentors are listed on one panel and the selection function are added to it */}
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

          {/* An Assign button which calls the assign() to assign the selected students to the selected mentor */}
          <button className="btn assign-btn" onClick={() => Assign()}>
            Assign
          </button>
        </div>
      )}
    </>
  );
}

export default AssignStudent;
