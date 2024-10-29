import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class GeminiService {
    private apiKey = environment.GEMINI_API_KEY;
    private apiUrl = environment.GEMINI_API_URL;

    constructor(private http: HttpClient) { }

    generateResponse(prompt: string): Observable<any> {
        if (!this.apiKey) {
            console.error('Gemini API key is not configured');
            return throwError(() => new Error('API key not configured'));
        }

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        };

        return this.http.post(`${this.apiUrl}?key=${this.apiKey}`, body, { headers })
            .pipe(
                map((response: any) => {
                    if (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) {
                        return response;
                    } else {
                        throw new Error('Invalid response format from Gemini API');
                    }
                }),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An error occurred';
        if (error.status === 401) {
            errorMessage = 'API key is invalid or missing. Please check your configuration.';
        } else if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}