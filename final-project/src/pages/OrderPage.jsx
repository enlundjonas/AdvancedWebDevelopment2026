import { useState } from "react";
import { z } from "zod";



const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

function OrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        fieldErrors[fieldName] = issue.message;
      });

      setErrors(fieldErrors);
      setSuccessMessage("");
      setApiResponse(null);
      return;
    }

    setErrors({});
    setSuccessMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      setApiResponse(data);
      setSuccessMessage("Form submitted and sent to server successfully! 🎉");
    } catch (error) {
      console.error(error);
      setSuccessMessage("Something went wrong while sending data ❌");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div class="max-w-5xl mx-auto px-6 py-9 text-center">
      <h2 class="text-4xl font-bold mb-9">Register to continue</h2>
      <h4>Please fill in your details to proceed with your order.</h4>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 flex flex-col space-y-4 text-left">

        {/* Name */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="email.address@example.com"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
        </div>

        {/* register button */}
        <div className="text-center py-6">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Register
          </button>
        </div>
      </form>


      {successMessage && <p>{successMessage}</p>}
      {loading && <p>Sending data... ⏳</p>}

      {apiResponse && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Server Response (Echo)
          </h2>


          <pre className="bg-green-500 text-white p-4 rounded-xl overflow-x-auto text-sm">
            {JSON.stringify(apiResponse.json, null, 2)}
          </pre>

        </div>
      )}
    </div>
  );
}


export default OrderPage;