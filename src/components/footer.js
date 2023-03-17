export default function Footer() {
  return (
    <>
      <footer class="bg-dark text-center text-white">
        <div class="container p-1">
          <section class="mb-1">
            <a
              class="btn btn-outline-light btn-floating m-1"
              href="/"
              role="button"
            >
              <i class="fab fa-facebook-f"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
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

          <form action="">
            <div class="row d-flex justify-content-center">
              <div class="col-auto">
                <p class="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>

              <div class="col-md-5 col-12">
                <div class="form-outline form-white mb-4">
                  <input
                    type="email"
                    id="form5Example21"
                    class="form-control"
                  />
                  <label class="form-label" for="form5Example21"></label>
                </div>
              </div>

              <div class="col-auto">
                <button type="submit" class="btn btn-outline-light mb-4">
                  Subscribe
                </button>
              </div>
            </div>
          </form>

          <p>Bạn chưa tìm được một nửa của mình hãy đến với chúng tôi </p>
        </div>

        <div
          class="text-center p-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 -
          <a class="text-white" href="https://mdbootstrap.com/">
            TLK
          </a>
        </div>
      </footer>
    </>
  );
}
