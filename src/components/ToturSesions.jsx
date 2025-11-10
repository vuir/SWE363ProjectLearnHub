import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';



export default function ToturSesions({ seesion, index, onMutateCourse }) {
  const [totre, settotre] = useState("");
  const [date, setDate] = useState("");
  return (
    <article className="Session-card">
      <header className="cardHeader">
        <h1>{seesion.id}</h1>
        <h2>{seesion.time}</h2>
      </header>
      <PersonIcon/>
      <h3>{seesion.totre}</h3>
    </article>
  );
}