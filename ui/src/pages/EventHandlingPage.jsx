import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import EventForm from "../components/EventForm";

const EventHandlingPage = () => {
  const { id } = useParams();
  const isEdit = !!id;

  console.log("isEdit", isEdit);

  return (
    <>
      <Navbar noButtons={true} />
      <EventForm isEdit={isEdit} />
    </>
  );
};

export default EventHandlingPage;
