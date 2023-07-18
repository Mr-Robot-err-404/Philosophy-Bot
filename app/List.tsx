"use client"

import Link from "next/link"
import { AiOutlineLike } from 'react-icons/ai'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useState } from "react"

export function List({comments, map, sortedComments, likes} : any) {
    const [numItems, setNumItems] = useState(20)
    const [selectedQuote, setSelectedQuote] = useState(null)
    const [category, setCategory] = useState("recent")
    const currTime = new Date().toISOString().split("-")
    currTime[2] = currTime[2][0] + currTime[2][1]
    return (
        <div className="flex justify-center w-full bg-slate-900">
            <ul className="text-sm font-medium bg-slate-800 border-gray-600 text-white md:w-3/4 lg:w-1/2 md:border md:rounded-lg">
                <li
                className="py-2 border-b border-slate-700 text-gray-300 hover:text-blue-600 cursor-default">
                    <div onClick={() => {
                    if(category === "recent") setCategory("popular")
                    else setCategory("recent")
                }}  
                    className="flex flex-row justify-center items-center ">
                        <div className="px-1">
                            <h2>{category === "recent" ? "Recently posted quotes" : "Popular comments"}</h2>
                        </div>
                        <MdOutlineKeyboardArrowDown size={15}/>
                    </div>
                </li>
                {category === "recent" && 
                comments.map((comment: any, i: number) => {
                const createdAt = new Date(comment.createdAt).toISOString().split("-")
                createdAt[2] = createdAt[2][0] + createdAt[2][1]
                let displayTime = ""
                if(createdAt[0] === currTime[0] && createdAt[1] === currTime[1]){
                    if(createdAt[2] === currTime[2]) displayTime = "today"
                    else if(parseInt(currTime[2]) - parseInt(createdAt[2]) === 1) displayTime = "yesterday"
                }
                if(!displayTime) displayTime = `${createdAt[2]}/${createdAt[1]}/${createdAt[0]}`
                if(i >= numItems) return
                return <li 
                        onClick={() => {
                        if(comment.id === selectedQuote) setSelectedQuote(null)
                        else setSelectedQuote(comment.id)
                        }} key={comment.id} className="px-4 py-2 border-b border-slate-700 hover:bg-slate-700 cursor-default">
                        <div className="px-5 w-full leading-tight">
                            <p>{`${map[comment.id].quote.text}`}</p>
                            <br />
                            <div className="flex">
                                <div className="flex opacity-0 justify-start w-full text-gray-300">
                                    <p>Dostoevsky</p>
                                </div>
                                <div className="flex justify-center w-full text-gray-300">
                                    <p>{`~ ${map[comment.id].quote.author}`}</p>
                                </div>
                                <div className="flex justify-end w-full text-gray-400">
                                    {displayTime}
                                </div>
                            </div>    
                            {selectedQuote === comment.id && 
                                <>  
                                    <br />
                                    <div className="flex justify-center w-full text-gray-300">
                                        <Link target="_blank" href={`https://youtube.com/watch?v=${comment.videoId}&lc=${comment.id}`}>
                                            <button className="bg-blue-600 hover:bg-blue-700 py-2 px-2 rounded-lg">
                                                Visit comment
                                            </button>
                                        </Link>
                                    </div>
                                </>
                            }
                        </div>
                    </li>
                })}
                {category === "popular" && 
                sortedComments.map((comment: any, i: number) => {
                const createdAt = new Date(comment.createdAt).toISOString().split("-")
                createdAt[2] = createdAt[2][0] + createdAt[2][1]
                let displayTime = ""
                if(createdAt[0] === currTime[0] && createdAt[1] === currTime[1]){
                    if(createdAt[2] === currTime[2]) displayTime = "today"
                    else if(parseInt(currTime[2]) - parseInt(createdAt[2]) === 1) displayTime = "yesterday"
                }
                if(!displayTime) displayTime = `${createdAt[2]}/${createdAt[1]}/${createdAt[0]}`
                if(i >= numItems) return
                return <li 
                        onClick={() => {
                        if(comment.id === selectedQuote) setSelectedQuote(null)
                        else setSelectedQuote(comment.id)
                        }} key={comment.id} className="px-4 py-2 border-b border-slate-700 hover:bg-slate-700 cursor-default">
                        <div className="px-5 w-full leading-tight">
                            <p>{`${map[comment.id].quote.text}`}</p>
                            <br />
                            <div className="flex">
                                <div className="flex justify-start w-full text-gray-300">
                                    {likes[comment.id] && 
                                        <div className="flex flex-row items-center justify-center">
                                            <AiOutlineLike size={15}/>
                                            <div className="px-1">{likes[comment.id]}</div>
                                        </div>
                                    }
                                </div>
                                <div className="flex justify-center w-full text-gray-300">
                                    <p>{`~ ${map[comment.id].quote.author}`}</p>
                                </div>
                                <div className="flex justify-end w-full text-gray-400">
                                    {displayTime}
                                </div>
                            </div>    
                            {selectedQuote === comment.id && 
                                <>  
                                    <br />
                                    <div className="flex justify-center w-full text-gray-300">
                                        <Link target="_blank" href={`https://youtube.com/watch?v=${comment.videoId}&lc=${comment.id}`}>
                                            <button className="bg-blue-600 hover:bg-blue-700 py-2 px-2 rounded-lg">
                                                Visit comment
                                            </button>
                                        </Link>
                                    </div>
                                </>
                            }
                        </div>
                    </li>
                })}
                {numItems < comments.length &&
                    <li>
                        <div className="flex justify-center w-full py-5">
                            <button onClick={() => setNumItems(prevItems => prevItems + 20)} className="bg-blue-700 rounded-lg py-2 px-2 hover:bg-blue-800">View more</button>
                        </div>
                    </li>
                }
            </ul>
        </div>
    )
}