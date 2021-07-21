import { useEffect, useState } from "react";

function ShowMentor() {
  const [list, setList] = useState([]);
  const [slist, setSlist] = useState([]);

  const showStudent = (std) => {
    // // console.log(std);
    // std.map((el) => {
    //   return console.log(el.studentName);
    // });
    setSlist(std);
  };

  const MentorList = async () => {
    try {
      const obj = await fetch("http://localhost:5002/getMentor", {
        method: "GET",
        headers: {
          "Content-Type": "application/JSON",
        },
      });
      const mentor = await obj.json();
      // console.log(mentor);

      setList(mentor);

      if (obj.status !== 200) {
        const error = new Error(obj.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    MentorList();
  });
  return (
    <div className="panel">
      <h1 className="title">Show Mentor</h1>

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
        <ul className="studentSide">
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
