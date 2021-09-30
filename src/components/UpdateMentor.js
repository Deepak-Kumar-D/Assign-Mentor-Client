import { useContext, useEffect, useState } from "react";
import { showLoad } from "../App";
import { BeatLoader } from "react-spinners";
import { BiEdit } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

function UpdateMentor() {
  const { loading, setLoading } = useContext(showLoad);
  const history = useHistory();

  const [list, setList] = useState();
  const [slist, setSlist] = useState([]);
  const [mlist, setMlist] = useState([]);
  const [student, setStudent] = useState();
  const [otherMentor, setOtherMentor] = useState([]);
  const [newMentor, setNewMentor] = useState();

  // Setting the current mentor of the selected student
  const currentMentor = (stud, ment) => {
    setList(ment);
    setStudent(stud);
    setOtherMentor([]);
  };

  // Function for assigning the new Mentor
  const Update = async () => {
    setLoading(true);
    const obj = await fetch(
      "https://react-assign-mentor.herokuapp.com/updateStudent",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({
          newMentorId: newMentor,
          studentId: student,
        }),
      }
    );

    if (obj.status !== 200) {
      setLoading(false);
      toast.error("Try again!", { position: "bottom-right", autoClose: 2000 });
    } else {
      setOtherMentor([]);
      setLoading(false);

      toast.success("Mentor updated successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });
      history.push("/update-mentor");
    }
  };

  // Showing the other mentors list
  const Edit = (eleId) => {
    const array = [];
    mlist.forEach((data) => {
      if (data._id !== eleId) {
        array.push(data);
      }
    });
    setOtherMentor(array);
  };

  // UseEffect to load the Mentor list and the Student list on the router page load
  useEffect(() => {
    // Fetching the mentor list on router load along with the students list
    const MentorList = async () => {
      setLoading(true);
      const obj = await fetch(
        "https://react-assign-mentor.herokuapp.com/getMentor",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      );
      const mentor = await obj.json();
      setMlist(mentor);
      setLoading(false);
    };

    // Fetching the student data on router load
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
    MentorList();
    StudentList();
  }, [setLoading]);

  return (
    <>
      {loading ? (
        <div className="load">
          <BeatLoader size={10} />
        </div>
      ) : (
        <div className="panel">
          <h1 className="title">Update Mentor</h1>

          <p className="p-align">
            Click <strong>Update</strong> after selecting the new mentor for a
            student.
          </p>

          <section className="f-screen dualScreen">
            {/* This will show the list of students who have a mentor and the selection function is added to it */}
            <ul className="mentorSide">
              {slist.map((ele) => {
                return ele.status ? (
                  <li className="u-btn chkBox" key={ele._id}>
                    <label htmlFor={ele._id}>{ele.name}</label>

                    <input
                      type="radio"
                      id={ele._id}
                      name="stdnt"
                      onClick={() => currentMentor(ele._id, ele.mentor)}
                    />
                  </li>
                ) : (
                  ""
                );
              })}
            </ul>

            {/* This will show the current mentor of the selected student */}
            <ul className="studentSide showStudent">
              {!list ? (
                <h2>Please Select the Student!</h2>
              ) : (
                <>
                  <p>Current Mentor</p>
                  <li className="chkBox">
                    <label htmlFor={list.mentorId}>{list.mentorName}</label>

                    <button
                      className="u-btn edit-btn"
                      onClick={() => Edit(list.mentorId)}
                    >
                      <BiEdit size="20" />
                    </button>
                  </li>
                </>
              )}

              {/* This will show the other available mentors when the edit button is clicked */}
              {otherMentor.length !== 0 ? (
                <>
                  <hr style={{ marginTop: "2rem", marginBottom: "0.5rem" }} />
                  <p>Other Available Mentor</p>
                  {otherMentor.map((ele) => {
                    return (
                      <li className="u-btn chkBox" key={ele._id}>
                        <label htmlFor={ele._id}>{ele.name}</label>

                        <input
                          type="radio"
                          id={ele._id}
                          name="new"
                          onClick={() => setNewMentor(ele._id)}
                        />
                      </li>
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </ul>
          </section>

          {/* This update button will update the new mentor to the selected student */}
          <button className="btn assign-btn" onClick={() => Update()}>
            Update
          </button>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default UpdateMentor;
