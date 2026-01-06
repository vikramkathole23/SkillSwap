import crypto from 'crypto'

const generateVideoMeetLink=()=>{
    const roomId = crypto.randomUUID();
    return `http://localhost:5173/skillswap-video-call/stream/${roomId}`
}

export default generateVideoMeetLink;