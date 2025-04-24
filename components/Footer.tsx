import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur-sm py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-lg bg-blue-600 text-white p-1 w-8 h-8">
                <span className="font-bold text-sm">QT</span>
              </div>
              <span className="font-bold text-xl">Qemem Tech</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Transforming ideas into digital reality with cutting-edge
              technology solutions.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/@estifanos_neway"
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://www.instagram.com/Estifanos_Neway"
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://github.com/Estifanos-Neway"
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/estifanos-neway/"
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services/web-development"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/mobile-apps"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ui-ux-design"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link
                 
                  href="/services/cloud-solutions"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Cloud Solutions
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-500 dark:text-gray-400">
                Addis Ababa , Ethiopia
                <br />
                Spokane, WD 94107
              </li>
              <li>
                <Link
                  href="mailto:hello@qememTech.com"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Estifanos.neway.d@gmail.com
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+15551234567"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  +251 963 18 29 98
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Qemem Tech. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="text-xs text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
