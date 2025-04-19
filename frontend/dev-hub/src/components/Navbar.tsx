import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { logout } from "@/redux/authSlice";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const logOut = () => {
    dispatch(logout());
    toast.success("Logout successfully!");
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <h1 className="text-lg font-bold">
        {" "}
        <Link href="/"> Dev Hub </Link>
      </h1>
      <div>
        <SearchBar />
      </div>
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <Link href="/questions" className="bg-blue-500 px-3 py-1 rounded">
            Questions
          </Link>
          <Link
            href={`/profile/${user?.id}`}
            className="bg-blue-500 px-3 py-1 rounded"
          >
            Profile
          </Link>
          <div>
            <span className="mr-4">Welcome, {user?.username}</span>
            <button className="bg-red-500 px-3 py-1 rounded" onClick={logOut}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Link href="/login" className="bg-blue-500 px-3 py-1 rounded">
          Login
        </Link>
      )}
    </nav>
  );
}
