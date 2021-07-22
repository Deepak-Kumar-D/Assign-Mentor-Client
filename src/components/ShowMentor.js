import { useEffect, useState } from "react";

function ShowMentor() {
  const [list, setList] = useState([]);
  const [slist, setSlist] = useState([]);

  const showStudent = (std) => {
    setSlist(std);
  };

  useEffect(() => {
    const MentorList = async () => {
      const obj = await fetch("http://localhost:5002/getMentor", {
        method: "GET",
        headers: {
          "Content-Type": "application/JSON",
        },
      });
      const mentor = await obj.json();

      setList(mentor);
    };

    MentorList();
  });
  return (
    <div className="panel">
      <h1 className="title">Show Mentor</h1>

      <div className="imgDiv">
        <img className="imgBG" src="/images/codes.jpg" alt="bg" />
      </div>

      <section className="f-screen dualScreen">
        <ul className="mentorSide">
          {list.map((mentor) => {
            return (
              <li key={mentor._id} onClick={() => showStudent(mentor.students)}>
                {mentor.name}
              </li>
            );
          })}
        </ul>
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
  );
}

export default ShowMentor;
