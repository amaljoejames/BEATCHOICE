import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
    const session = useSession();

    return (
        <div className="flex justify-center items-center h-16 bg-white/10 backdrop-blur-md p-4 rounded-lg">
            {session.data?.user ? (
                <button
                    className="relative m-2 px-6 py-3 rounded-full font-bold text-white overflow-hidden"
                    onClick={() => signOut()}
                >
                    {/* Blurred background layer */}
                    <span
                        className="absolute inset-0 bg-gradient-to-br from-blur-500 to-silver-700 blur-md opacity-80"
                        style={{
                            filter: "blur(10px)", // Adjust blur level here
                            borderRadius: "9999px", // Keeps the button rounded
                        }}
                    ></span>
                    
                    {/* Clear text on top with increased size */}
                    <span className="relative z-10 text-xl">Logout</span>
                </button>
            ) : (
                <button
                    className="relative m-2 px-6 py-3 rounded-full font-bold text-white overflow-hidden"
                    onClick={() => signIn()}
                >
                    {/* Blurred background layer */}
                    <span
                        className="absolute inset-0 bg-gradient-to-br from-blur-500 to-silver-700 blur-md opacity-80"
                        style={{
                            filter: "blur(10px)", // Adjust blur level here
                            borderRadius: "9999px", // Keeps the button rounded
                        }}
                    ></span>
                    
                    {/* Clear text on top with increased size */}
                    <span className="relative z-10 text-xl">Signin</span>
                </button>
            )}
        </div>
    );
}
