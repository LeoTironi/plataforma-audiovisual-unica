"use client"
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Watch = ({ params }: { params: { video: string } }) => {
  const video = params.video
  const router = useRouter();
  return (
    <div className="h-screen w-screen bg-black gap-50">

      <button className="">
        <ArrowBack sx={{ color: "white", fontSize: "35px", ":hover": { color: "red" }, margin:"10px", marginLeft:"20px"}} onClick={() => router.push("/")}/>
      </button>
      <iframe
        
        width="100%"
        height = {550}
        src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=0&loop=1`}
        allowFullScreen
      />
    </div>
  )
}

export default Watch