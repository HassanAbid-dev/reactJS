import React from "react";
import Card from "./components/Card";
const App = () => {
  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <h1 className="text-3xl text-black border rounded-2xl bg-green-600 p-4">
          TailwindCss
        </h1>
      </div>
      <div className="flex items-center justify-center gap-20 mt-5">
        <Card
          imageUrl="https://images.unsplash.com/photo-1497316730643-415fac54a2af?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFraW5nJTIwcGhvdG98ZW58MHx8MHx8fDA%3D"
          title="Card 1"
          description="This is the description for Card 1."
        />
        <Card
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-8Ne4j_5gRNNikzu_KZRIyzSihAQ74KAbiQ&s"
          title="Card 2"
          description="This is the description for Card 2."
        />
      </div>
    </>
  );
};

export default App;
