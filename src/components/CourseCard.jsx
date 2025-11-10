import { useState } from "react";


export default function CourseCard({ course, index, onMutateCourse }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  return (
    <article className="course-card">
      <header className="cardHeader">
        <span>{course.icon}</span>
        <h1>{course.id}</h1>
        <h2>{course.title}</h2>
      </header>
    </article>
  );
}