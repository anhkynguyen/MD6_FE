export default function Footer() {
  return (
    <>
      <footer style={{ backgroundColor: "rgb(24,24,40)", margin: "10px" }}>
        <div
          class="container"
          style={{ backgroundColor: "rgb(24,24,40)", textAlign: "center" }}
        >
          <section>
            <a
              class="btn btn-outline-light btn-floating"
              href="/"
              role="button"
            >
              <i class="fab fa-facebook-f"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating "
              href="/"
              role="button"
            >
              <i class="fab fa-twitter"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="/"
              role="button"
            >
              <i class="fab fa-google"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="/"
              role="button"
            >
              <i class="fab fa-instagram"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="/"
              role="button"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="/"
              role="button"
            >
              <i class="fab fa-github"></i>
            </a>
          </section>
          <p>Bạn chưa tìm được một nửa của mình hãy đến với chúng tôi </p>
        </div>

        <div
          class="text-center p-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 -Cyborg
        </div>
      </footer>
    </>
  );
}
