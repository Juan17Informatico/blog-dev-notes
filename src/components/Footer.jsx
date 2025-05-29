import { Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Redes sociales */}
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/in/juan-pablo-campuzano-monsalve-17a614207"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href="https://github.com/Juan17Informatico"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="#"
            className="hover:text-blue-500 transition-colors"
            aria-label="Twitter (X)"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>
        {/* Nombre o marca */}
        <div className="text-lg font-semibold">© 2025 JuanCatech.dev</div>
      </div>
    </footer>
  );
};
