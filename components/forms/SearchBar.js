import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchInput !== '') router.push(`/search/${searchInput}`);
  };

  return (
    <Form className="d-flex text" onSubmit={handleSearch}>
      <Form.Control
        type="search"
        placeholder="Search Product"
        className="me-2 search-bar"
        aria-label="Search"
        name="search"
        onChange={handleChange}
      />
    </Form>

  );
}
