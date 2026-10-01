
import {test, expect} from '@playwright/test';

//web app --> intercept the network calls and log them
//**= wild card ---matched all urls

//intercept the network calls....

test('intercept and log the requests', async ({page})=>
{
   await page.route('**/*', async(route)=>
    {
      console.log(route.request().method(),route.request().url())
      await route.continue();
    })

    //login steps web
    await page.goto('navenautomationlabs.com/opencart/index.php?route=account/login')

})

//intercept with mocking 
//mocking:fake data/response

test('mock search data api', async ({page})=>
{
    let fakeProducts=
    [
        {name:'Fake Macbook Proe',price:1000},
        {name:'Fake Macbook Air',price:800},
        {name:'Fake Macbook Mini',price:600}
    ]

   await page.route('**/index.php?route=account/login', async(route)=>
    {
      route.fulfill({
      status:200,
        contentType:'application/json',
        body:JSON.stringify(fakeProducts)
      })
    })

    //login steps web
    await page.goto('navenautomationlabs.com/opencart/index.php?route=account/login')
    await page.pause()

    await page.evaluate(async ()=>
    {
      let fakeRes=  await fetch('https://navenautomationlabs.com/opencart/index.php?route=account/login')  
      return await fakeRes.json() 
    })

})
