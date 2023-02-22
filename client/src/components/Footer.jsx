import React from "react";

const navigation = {
  main: [
    { name: "Furniture", href: "/productpage" },
    { name: "Dining", href: "/Dining" },
    { name: "Wall Art", href: "#" },
    { name: "Lighting", href: "#" },
  ],
};

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-2">
      <div className="mx-auto max-w-7xl overflow-hidden py-2 px-4 sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 pt-4">
              <a
                href={item.href}
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>

        <p className="mt-8 text-center text-sm text-gray-400 ">
          &copy; {year} Modern Living, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
