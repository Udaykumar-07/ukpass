export default function About() {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold mb-4 text-black">About UK-Pass Password Manager</h1>
        <p className="text-gray-700 mb-4">
          UK-Pass is a secure and user-friendly password manager designed to help you store,
          manage, and access your passwords safely. With end-to-end encryption, your sensitive
          data remains protected at all times.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-black">Why Choose UK-Pass?</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Strong encryption to keep your passwords safe</li>
          <li>Easy-to-use interface for quick access</li>
          <li>Multi-device synchronization</li>
          <li>Secure password generation</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-black">Our Mission</h2>
        <p className="text-gray-700">
          Our mission is to provide individuals and businesses with a reliable and secure
          way to manage their passwords while maintaining privacy and security.
        </p>
      </div>
    );
  }
  