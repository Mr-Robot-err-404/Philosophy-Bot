import Image from "next/image"
import { PrismaClient } from "@prisma/client"
import { List } from "./List"
import { quickSort } from "@/lib/quicksort"

const prisma = new PrismaClient()

async function fetchComments() {
  const arr = await prisma.comment.findMany()
  const quotes = await prisma.quote.findMany()
  const likes = await prisma.likes.findMany()
  let map: any = {}
  for(var i = 0, j = arr.length - 1; i <= j; i++, j--){
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < quotes.length; j++){
      if(arr[i].quoteId === quotes[j].id){
        map[arr[i].id] = {
          quote: quotes[j], 
          vidId: ""
        }
        break
      }
    }
  }
 
  return [arr, quotes, map, likes[0].map]
}

export default async function Home() {
  const [comments, quotes, map, likes] = await fetchComments()
  const copy = [...comments]
  const sortedComments = quickSort(copy, likes)
  return (
    <main>
      <nav className="bg-slate-900 w-full h-20 sticky top-0">
        <div className="flex justify-center items-center h-full py-5">
          <Image src="/profile.jpg" width={60} height={60} className="rounded-full" alt="ProfilePic"/>
        </div>
      </nav>
      <List comments={comments} sortedComments={sortedComments} likes={likes} map={map}/>
    </main>
  )
}
