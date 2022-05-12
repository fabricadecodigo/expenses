import { Routes, Route, Link } from 'react-router-dom';
import { ExpenseEditPage } from './expenses/pages/expense-edit';
import { ExpenseListPage } from './expenses/pages/expense-list';
import { Navbar, Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Minhas despesas
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div className='container my-4'>
        <Routes>
          <Route path='/' element={<ExpenseListPage />} />
          <Route path='/new' element={<ExpenseEditPage />} />
          <Route path='/edit/:id' element={<ExpenseEditPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
