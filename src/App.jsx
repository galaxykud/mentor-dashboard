import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import NoticeDialog from "./components/NoticeDialog";
import StudentDrawer from "./components/StudentDrawer/StudentDrawer";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import CalendarPage from "./pages/CalendarPage";
import { allStudents } from "./data/students";
import useNavigation from "./hooks/useNavigation";
export default function App() {
  const [dialog, setDialog] = useState(null);
  const { page, studentName, navigate, goPage: changePage } = useNavigation();
  const selectedStudent = allStudents.find(
    (student) => student.name === studentName,
  );
  const open = (title, body) => setDialog({ title, body });
  const goPage = (page) => {
    setDialog(null);
    changePage(page);
  };
  const openStudent = (student) =>
    navigate("/students?student=" + encodeURIComponent(student.name));
  const closeStudent = () => navigate("/students");
  useEffect(() => {
    document.title = `${{ home: "Главная", students: "Ученики", calendar: "Календарь" }[page]} — кабинет куратора`;
  }, [page]);
  return (
    <>
      <Sidebar
        page={page}
        selectedStudent={selectedStudent}
        goPage={goPage}
        open={open}
      />
      <main>
        {page === "students" ? (
          <StudentsPage
            open={open}
            onDetails={openStudent}
            selectedStudent={selectedStudent}
          />
        ) : page === "calendar" ? (
          <CalendarPage open={open} />
        ) : (
          <DashboardPage open={open} goPage={goPage} />
        )}
      </main>
      {selectedStudent && (
        <StudentDrawer
          key={selectedStudent.name}
          student={selectedStudent}
          onClose={closeStudent}
          open={open}
        />
      )}
      {dialog && (
        <NoticeDialog dialog={dialog} onClose={() => setDialog(null)} />
      )}
    </>
  );
}
