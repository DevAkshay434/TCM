import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import CardContact from '../Card/Card';

export default function Form({ pages }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false); // State for success message
    const [error, setError] = useState(''); // State for error message

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'first_name':
                setFirstName(value);
                break;
            case 'last_name':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'message':
                setMessage(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate required fields
        if (!firstName || !email || !phone) {
            setError('First Name, Email, and Phone are required.');
            return;
        }

        setError(''); // Clear any previous error messages

        const templateParams = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            message: message,
        };

        emailjs.send('service_irmfjxh', 'template_j5maumu', templateParams, 'qTsT10oBWbMwF4y95')
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
            setShowSuccess(true);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setMessage('');

            setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
        })
        .catch((err) => {
            console.error('Failed to send email. Error:', err);
        });
    };

    return (
        <section className="contact-form 2xl:py-[50px] xl:py-8 lg:py-6 py-4">
            <div className="container mx-auto text-center">
                <h1 className='text-3xl lg:text-4xl font-normal xl:text-5xl 2xl:text-6xl' dangerouslySetInnerHTML={{ __html: pages.title }} />
                <CardContact pages={pages}/>
                <p className='py-2 text-base lg:text-lg xl:text-xl 2xl:text-2xl' dangerouslySetInnerHTML={{ __html: pages.description }} />

                {showSuccess && (
                       <div className="flex justify-center">
                    <div className="max-w-lg flex text-center items-center bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert" tabIndex="-1" aria-labelledby="hs-toast-success-example-label">
                        <div className="flex p-4">
                            <div className="shrink-0">
                                <svg className="shrink-0 size-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                                </svg>
                            </div>
                            <div className="ms-3">
                                <p id="hs-toast-success-example-label" className="text-sm text-gray-700 dark:text-neutral-400">
                                    Thank You for contacting us. We will reach you soon.
                                </p>
                            </div>
                        </div>
                    </div>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center">
                    <div className="max-w-lg flex text-center items-center bg-red-100 border border-red-400 rounded-lg p-4 mb-4">
                        <p className="text-red-700">{error}</p>
                    </div>
                    </div>
                )}

                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className="grid md:px-8 px-4 lg:px-10 2xl:px-10 xl:px-14 grid-cols-1 md:grid-cols-2 justify-end gap-4 items-center">
                        <div className="md:text-end">
                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={firstName}
                                onChange={handleInputChange}
                                className='border-[1px] focus:outline-blues focus:ring-inherit border-blues md:w-2/3 w-full h-12 rounded-lg md:mb-2 mb-1 p-2'
                            />
                        </div>
                        <div className="md:text-start">
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={handleInputChange}
                                className='border-[1px] focus:outline-blues focus:ring-inherit border-blues md:w-2/3 w-full h-12 rounded-lg md:mb-2 mb-1 p-2'
                            />
                        </div>
                        <div className="md:text-end">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleInputChange}
                                className='border-[1px] focus:outline-blues focus:ring-inherit border-blues md:w-2/3 w-full h-12 rounded-lg md:mb-2 mb-1 p-2'
                            />
                        </div>
                        <div className="md:text-start">
                            <input
                                type="number"
                                name="phone"
                                placeholder="Phone"
                                value={phone}
                                onChange={handleInputChange}
                                className='border-[1px] focus:outline-blues focus:ring-inherit border-blues md:w-2/3 w-full h-12 rounded-lg md:mb-2 mb-1 p-2'
                            />
                        </div>
                        <div className="md:col-span-2 mb-2">
                            <textarea
                                name="message"
                                className='resize-none md:h-44 h-28 focus:outline-blues focus:ring-1 border-blues md:w-2/3 w-full border-[1px] rounded-lg mb-2 p-2'
                                placeholder={pages.textareaPlaceholder}
                                value={message}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="col-12 my-1 my-xl-2">
                        <button className='font-normal text-white bg-blues p-2 rounded-lg w-44' type="submit" aria-label="Submit">
                            {pages.submitButton}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
