import { Routes, Route, Link } from 'react-router-dom';
import { ExpenseEditPage } from './expenses/pages/expense-edit';
import { ExpenseListPage } from './expenses/pages/expense-list';
import { Navbar, Container } from 'react-bootstrap';

function App() {
  return (
    <div>
      <Navbar bg='light' variant='light'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Expenses
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div className='container'>
        <Routes>
          <Route path='/' element={<ExpenseListPage />} />
          <Route path='/new' element={<ExpenseEditPage />} />
          <Route path='/edit/:id' element={<ExpenseEditPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
