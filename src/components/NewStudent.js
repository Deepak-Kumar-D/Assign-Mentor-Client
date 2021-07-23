import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { showLoad } from "../App";
import { BeatLoader } from "react-spinners";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
});

function NewStudent() {
  const { loading, setLoading } = useContext(showLoad);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // On Submit will create the new student
  const onSubmit = async (data) => {
    setLoading(true);
    await fetch("https://react-assign-mentor.herokuapp.com/createStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    });
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <div className="load">
          <BeatLoader size={10} />
        </div>
      ) : (
        <div className="panel">
          <h1 className="title">Create Student</h1>

          <div className="imgDiv">
            <img className="imgBG" src="/images/codes.jpg" alt="bg" />
          </div>

          <div className="f-screen main">
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name">Student Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter the name"
                {...register("name")}
              />
              <p className="message">
                {errors.name && "⚠ Please fill the name!"}
              </p>

              <label htmlFor="email">E-mail Id</label>
              <input
                name="email"
                type="text"
                placeholder="Enter the email"
                {...register("email")}
              />
              <p className="message">
                {errors.email && "⚠ Please fill the email!"}
              </p>

              <input className="btn" type="submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NewStudent;
