import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
});

function NewStudent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const obj = await fetch("http://localhost:5002/createStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    });
    const mentor = await obj.json();
    console.log(mentor);
  };
  return (
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
          <p className="message">{errors.name && "⚠ Please fill the name!"}</p>

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
  );
}

export default NewStudent;
