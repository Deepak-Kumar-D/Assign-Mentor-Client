import { useContext, useEffect, useState } from "react";
import { showLoad } from "../App";
import { BeatLoader } from "react-spinners";

function ShowMentor() {
  const { loading, setLoading } = useContext(showLoad);
  const [list, setList] = useState([]);
  const [slist, setSlist] = useState([]);

  // This will add the list of students of a mentor
  const showStudent = (std) => {
    setSlist(std);
  };

  // Fetching the mentor on the router page load
  useEffect(() => {
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
      setLoading(false);
      setList(mentor);
    };

    MentorList();
  }, [setLoading]);
  return (
    <>
      {loading ? (
        <div className="load">
          <BeatLoader size={10} />
        </div>
      ) : (
        <div className="panel">
          <h1 className="title">Show Mentor</h1>

          <div className="imgDiv">
            <img className="imgBG" src="/images/codes.jpg" alt="bg" />
          </div>

          <section className="f-screen dualScreen">
            {/* This will show the mentor list on the router page load and the selection function is added to it which will display the students under a mentor */}
            <ul className="mentorSide">
              {!list.length ? (
                <h2>Please Create New Mentors!</h2>
              ) : (
                list.map((mentor) => {
                  return (
                    <li
                      key={mentor._id}
                      onClick={() => showStudent(mentor.students)}
                    >
                      {mentor.name}
                    </li>
                  );
                })
              )}
            </ul>

            {/* This will show the student of the selected mentor in a single panel */}
            <ul className="studentSide showStudent">
              {slist.length === 0 ? (
                <h2>Please Select the Mentor!</h2>
              ) : (
                slist.map((student) => {
                  return <li key={student._id}>{student.studentName}</li>;
                })
              )}
            </ul>
          </section>
        </div>
      )}
    </>
  );
}

export default ShowMentor;
