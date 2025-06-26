import React from 'react'
import { Dot, Sparkles } from "lucide-react";

function GmailComponent() {
    return (
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gray-100 px-4 py-3 border-b border-b-gray-300 flex items-center">
                <div className="flex items-center space-x-2">
                    <Dot size={20} strokeWidth={15} className="text-red-500 fill-red-500" />
                    <Dot size={20} strokeWidth={15} className="text-yellow-500 fill-yellow-500" />
                    <Dot size={20} strokeWidth={15} className="text-green-500 fill-green-500" />
                </div>
                <div className="ml-4 text-sm font-medium text-gray-700">Gmail</div>
            </div>

            {/* Body content */}
            <div className="p-6 space-y-6">
                {/* First Email */}
                <div className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r-lg">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <div className="font-semibold text-gray-800">You</div>
                            <div className="text-sm text-gray-600">to: client@company.com</div>
                        </div>
                        <div className="text-sm text-gray-500">5 days ago</div>
                    </div>
                    
                    <div className="space-y-3 text-gray-800">
                        <p>Hi Sarah,</p>
                        <p>Hope you're doing well! I wanted to follow up on our proposal for the marketing campaign. Would love to hear your thoughts and answer any questions you might have.</p>
                        <p>Best regards,<br />Alex</p>
                    </div>
                </div>

                {/* Second Email */}
                <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded-r-lg">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2">
                            <div>
                                <div className="flex font-semibold text-gray-800">
                                    <h2 className='mr-3'>You</h2>
                                    <div className="flex items-center space-x-1 bg-green-200 px-2 py-1 rounded-full">
                                        <Sparkles size={12} className="text-yellow-600" />
                                        <span className="text-xs text-green-800 font-medium">AI Generated</span>
                                    </div>
                                </div>
                            
                                <div className="text-sm text-gray-600">to: client@company.com</div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">Just now</div>
                    </div>
                    
                    <div className="space-y-3 text-gray-800">
                        <p>Hi Sarah,</p>
                        <p>I hope this email finds you well. I wanted to gently follow up on the marketing proposal I sent last week. I understand you're likely busy, so please take your time reviewing it.</p>
                        <p>If you have any questions or would like to discuss any aspects of the proposal, I'm happy to schedule a quick call at your convenience.</p>
                        <p>Thank you for your time, and I look forward to hearing from you.</p>
                        <p>Best regards,<br />Alex</p>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default GmailComponent