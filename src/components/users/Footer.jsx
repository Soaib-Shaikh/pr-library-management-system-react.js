import React from 'react';

function Footer() {
  return (
    <footer className="footer bg-dark text-light pt-5">
      <div className="container">
        <div className="row">

          {/* About */}
          <div className="col-md-4 col-sm-12 mb-4">
            <h5>About Library</h5>
            <p>
              📚 Our library offers a wide collection of books across genres. 
              Borrow, read, and explore your favorite books anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-sm-6 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/books" className="text-light">All Books</a></li>
              <li><a href="/my-books" className="text-light">My Books</a></li>
              <li><a href="/contact" className="text-light">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-md-2 col-sm-6 mb-4">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Fiction</a></li>
              <li><a href="#" className="text-light">Non-fiction</a></li>
              <li><a href="#" className="text-light">Science</a></li>
              <li><a href="#" className="text-light">Technology</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 col-sm-12 mb-4">
            <h5>Contact Us</h5>
            <p>Email: info@library.com</p>
            <p>Phone: +91 12345 67890</p>
            <p>Address: 123 Library Street, City, Country</p>
            <div className="social-icons mt-2">
              <a href="#" className="text-light me-2">🌐</a>
              <a href="#" className="text-light me-2">🐦</a>
              <a href="#" className="text-light me-2">📘</a>
              <a href="#" className="text-light">📸</a>
            </div>
          </div>

        </div>

        <hr className="bg-light" />

        <div className="text-center pb-3">
          &copy; {new Date().getFullYear()} Library. All rights reserved.
        </div>
      </div>

      <style jsx>{`
        .footer a:hover {
          text-decoration: underline;
        }
        .social-icons a:hover {
          transform: scale(1.2);
          transition: 0.3s;
        }
        @media (max-width: 768px) {
          .footer h5 {
            margin-top: 1rem;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
