import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { showLoad } from "../App";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
});

function NewMentor() {
  const { loading, setLoading } = useContext(showLoad);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // On submit will create the new mentor
  const onSubmit = async (data) => {
    setLoading(true);
    const obj = await fetch(
      "https://react-assign-mentor.herokuapp.com/createMentor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
        }),
      }
    );

    if (obj.status !== 200) {
      setLoading(false);
      toast.error("Try again!", { position: "bottom-right", autoClose: 2000 });
    } else {
      reset();
      setLoading(false);
      toast.success("Mentor created successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };
  return (
    <>
      {loading ? (
        <div className="load">
          <BeatLoader size={10} />
        </div>
      ) : (
        <div className="panel">
          <h1 className="title">Create Mentor</h1>

          <div className="imgDiv">
            <img className="imgBG" src="/images/codes.jpg" alt="bg" />
          </div>

          <div className="f-screen main">
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name">Mentor Name</label>
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
      <ToastContainer />
    </>
  );
}

export default NewMentor;
