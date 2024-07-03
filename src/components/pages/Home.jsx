import backgroundImage from "../../assets/image/home.jpg"; // Adjust the path as per your project structure

const Home = () => {
  return (
    <div
      className="h-screen w-[80%] mx-auto flex justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold ">
          Welcome to Our Task CRUD Web App
        </h1>
        <p className="text-lg text-[#182D47] mt-4">
          Manage your tasks efficiently with our simple yet powerful app.
        </p>
      </div>
    </div>
  );
};

export default Home;
