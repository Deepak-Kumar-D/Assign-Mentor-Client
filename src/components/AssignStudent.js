import { useContext, useEffect, useState } from "react";
import { showLoad } from "../App";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Assigning the array of students to the selected mentor
  const Assign = async () => {
    setLoading(true);
    const obj = await fetch(
      "https://react-assign-mentor.herokuapp.com/updateMentor",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({
          mentorId: mentor,
          studentId: student,
        }),
      }
    );

    if (obj.status !== 200) {
      setLoading(false);
      toast.error("Try again!", { position: "bottom-right", autoClose: 2000 });
    } else {
      setMentor();
      setStudent([]);

      setTimeout(() => {
        // StudentList();
        setLoading(false);
      }, [1000]);

      toast.success("Student assigned successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    // Fetching the mentor data on router page load
    const MentorList = async () => {
      setLoading(true);
      const obj = await fetch(
        "https://react-assign-mentor.herokuapp.com/getMentor",
        {
          method: "GET",
        }
      );

      const mdata = await obj.json();
      setMlist(mdata);
      setLoading(false);
    };

    // Fetching the student data on router page load
    const StudentList = async () => {
      setLoading(true);
      const obj = await fetch(
        "https://react-assign-mentor.herokuapp.com/getStudent",
        {
          method: "GET",
        }
      );

      const sdata = await obj.json();
      setSlist(sdata);
      setLoading(false);
    };

    if (isSubscribed) {
      MentorList();
      StudentList();
    }

    return () => {
      isSubscribed = false;
    };
  }, [setLoading, setMlist, setSlist]);
  return (
    <>
      {loading ? (
        <div className="load">
          <BeatLoader />
        </div>
      ) : (
        <div className="panel">
          <h1 className="title">Assign Student</h1>

          <p className="p-align">
            Click <strong>Assign</strong> after selecting any one mentor and the
            required students under them.
          </p>

          <section className="f-screen dualScreen">
            {/* Listing the list of mentors on one panel and adding the selection function to it */}
            <ul className="mentorSide">
              {!mlist.length ? (
                <h2>Please Create New Mentors!</h2>
              ) : (
                mlist.map((mEle) => {
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
                })
              )}
            </ul>

            {/* List of available students who do not have mentors are listed on one panel and the selection function are added to it */}
            <ul className="studentSide">
              {!slist.length ? (
                <h2>Please Create New Students!</h2>
              ) : (
                slist.map((sEle) => {
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
                })
              )}
            </ul>
          </section>

          {/* An Assign button which calls the assign() to assign the selected students to the selected mentor */}
          <button className="btn assign-btn" onClick={() => Assign()}>
            Assign
          </button>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default AssignStudent;
